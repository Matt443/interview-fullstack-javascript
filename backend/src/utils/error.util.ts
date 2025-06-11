export function withDbErrorHandling<T extends (...args: any[]) => any>(fn: T) {
    return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
        try {
            return await fn(...args);
        } catch (error) {
            console.error("Database error:", error);
            throw error; // Re-throw so controller can decide how to respond
        }
    };
}
