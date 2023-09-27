
import { Product } from '../../../interfaces/product.interface';
import { RequestState, TableData } from '../interfaces';
import { productService } from '../../../services/apis';
import { getController } from '../../../services/apis/configs/axiosUtils';
import { FieldsValidation } from '../interfaces/fieldsValidation.interface';

type SetTableDataState = React.Dispatch<React.SetStateAction<TableData>>
type SetRequestState = React.Dispatch<React.SetStateAction<RequestState>>
type SetFieldValidationState = React.Dispatch<React.SetStateAction<FieldsValidation>>
type SetFormFieldState = React.Dispatch<React.SetStateAction<Product>>

interface CrudProductProps {
    item: Product,
    setTableData: SetTableDataState,
    setRequestState: SetRequestState,
    setValidationErrors: SetFieldValidationState
}

/*=============================================
=               Form validation               =
=============================================*/
export const validateTitle = (title: string) => !title.trim() ? 'Title is required' : '';
export const validateDescription = (description: string) => !description.trim() ? 'Description is required' : '';

export const validateForm = (formFields: Product) => {
    const titleError = validateTitle(formFields.title);
    const descriptionError = validateDescription(formFields.description);

    if (titleError || descriptionError) {
        return {
            message: "Fill all required fields",
            fields: {
                title: titleError,
                description: descriptionError
            }
        };

    } else {
        return null;
    }
};
/*=====      End of Form validation   ======*/



/*=============================================
=             Get product list            =
=============================================*/
export const fetchData = async (
    // prevValue: TableData, 
    setTableData: SetTableDataState, 
    cancelation?: AbortSignal
    ) => {
        const queryParams = {
            limit: 20
        }
        setTableData( prevState => ({ ...prevState, loading: true }))
        productService.get({ queryParams, cancelation: cancelation })
            .then(res => {
                if (res && res.data.products) {
                    setTableData( prevState => ({ ...prevState, rows: res.data.products, loading: false }))
                }
            })
            .catch((err) => {
                setTableData( prevState => ({ ...prevState, loading: false, error: err }))
            })
        }
/*=====  End of Get product list  ======*/


/*=============================================
=             Create product Action            =
=============================================*/
export const createProduct = async ({
    item, 
    setTableData, 
    setRequestState,
    setValidationErrors
  }: CrudProductProps) => {
    const controller = getController();
  
    const error = validateForm(item);
    if (error) {
      setValidationErrors(error);
      return;
    }
  
    setRequestState((prevState) => ({ ...prevState, inProcess: true }));
  
    try {
      const response = await productService.post({ requestData: item, cancelation: controller.signal });
  
      setTableData( prevState => ({ ...prevState, rows: [response?.data, ...prevState.rows] }));
      setRequestState((prevState) => ({ ...prevState, inProcess: false }));
    } catch (err: any) {
      // Check if the error is due to aborting the request
      if (err.name === 'AbortError') {
        console.log('Request aborted:', err);
      } else {
        setRequestState((prevState) => ({ ...prevState, inProcess: false, error: err }));
      }
    } finally {
      // Always abort the request after it's done, whether it succeeded or failed
      controller.abort();
    }
  };
/*=====  End of Create product action  ======*/


/*=============================================
=             Update product Action            =
=============================================*/
export const updateProduct = async ({
    item, 
    setTableData,
    setRequestState,
    setValidationErrors
}: CrudProductProps) => {
        const controller = getController();

        const error = validateForm(item);
        
        if(error) {
            setValidationErrors(error)
            return;
       }

        setRequestState( prevState => ({ ...prevState, inProcess: true }))

        try {
            await productService.put({ requestData: item, cancelation: controller.signal });
        
            setTableData(prevState => ({
                ...prevState,
                rows: prevState.rows.map((product) => {
                    if (product.id === item.id) {
                        return item;
                    }
                    return product;
                })
            }))

            setRequestState( prevState => ({ ...prevState, inProcess: false }))

          } catch (err: any) {
            // Check if the error is due to aborting the request
            if (err.name === 'AbortError') {
              console.log('Request aborted:', err);
            } else {
                /** When the request fail, the variable is set back to false so, the user can try again */
                setRequestState( prevState => ({ ...prevState, inProcess: false, error: err }))
            }
          } finally {
            // Always abort the request after it's done, whether it succeeded or failed
            controller.abort();
          }
}

/*=====  End of Update product action  ======*/


/*=============================================
=             Delete product Action            =
=============================================*/
export const deleteProduct = ({
    item, 
    setTableData, 
    setRequestState 
}: Omit<CrudProductProps, 'setValidationErrors'>) => {
    const controller = getController();

    setRequestState( prevState => ({ ...prevState, inProcess: true }))
    productService.delete({ requestData: item, cancelation: controller.signal })
        .then(res => {
            /** When the request succeded, the variable is set back to false */
            setTableData(prevState => ({
                ...prevState,
                rows: prevState.rows.filter((p) => p.id !== item.id)
            }))

            setRequestState( prevState => ({ ...prevState, inProcess: false }))
        })
        .catch((err) => {
            setRequestState( prevState => ({ ...prevState, inProcess: false, error: err }))
    })
}
/*=====  End of Delete product action  ======*/

/*=============================================
=       Form input element (onChange)         =
=============================================*/
export const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFormFields: SetFormFieldState,
    setValidationErrors: SetFieldValidationState,
) => {
      const { name, value } = e.target;
      setFormFields( prevState => ({
          ...prevState,
          [name]: value,
      }));

      setValidationErrors( prevState => {
        return {
          ...prevState,
          fields: {
            ...prevState.fields,
            [name]: '',
          }
        }
      });
}
/*=====  End of Form input element (onChange)  ======*/

/*=============================================
=   Select / remove product for deletion     =
=============================================*/
export const toggleDeleteProduct = (
    setProductToDelete: React.Dispatch<React.SetStateAction<Product | null>>,
    item?: Product,
    ) => {
        if (item?.id) {
            setProductToDelete(item);
        }
        else {
            setProductToDelete(null);
        }
    };
/*=====  Select / remove product for deletion  ======*/

/*=============================================
=   Select / remove product for edition     =
=============================================*/
export const toggleEditProduct = (
    setFormFields: SetFormFieldState,
    item?: Product,
    initialFormFields?: Product
    ) => {
        const setFields = item?.id ? item : initialFormFields;
        setFormFields( prevState => ({
            ...prevState,
            ...setFields
        }))
    };
/*=====  Select / remove product for edition  ======*/