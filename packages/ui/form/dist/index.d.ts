interface InputBaseProps<T> {
    readonly name?: string;
    readonly error?: boolean;
    readonly onChange?: (e: InputEvent<T>) => void;
    readonly value?: T;
    readonly disabled?: boolean;
}
interface InputEvent<T> {
    readonly target: InputValue<T>;
}
interface InputValue<T> {
    readonly value: T;
}

type Validator = (value: any) => boolean;

type FormValueTypes = any;

declare class Validators {
    static validate(value: FormValueTypes, validators: Validator[]): boolean;
    static isRequired: (isRequired?: boolean) => (value: any) => boolean;
    static required: (value: FormValueTypes) => boolean;
    static isAnEmail: (value: string) => boolean;
    static isATelephoneNumber: (value: string) => boolean;
    static max: (maxValue: number) => (value?: string | any[]) => boolean;
    static min: (minValue: number) => (value?: string | any[]) => boolean;
    static isAPattern: (pattern: RegExp) => (value?: string) => boolean;
    static customValidator: (f: Validator) => (value?: FormValueTypes) => boolean;
}

export { InputBaseProps, Validator, Validators };
