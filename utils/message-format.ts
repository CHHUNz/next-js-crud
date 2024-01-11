import { String } from 'typescript-string-operations';

export const MessageFormat = {
    format: (message: string,...args: any[]) => String.format(message,args)
}