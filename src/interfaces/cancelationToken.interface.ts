/**
 * Represents a token that can signal cancellation for asynchronous operations.
 * 
 * - `signal`: An optional AbortSignal to notify of cancellation events.
 */

export interface CancelationToken {
    cancelation?: AbortSignal | undefined;
}
