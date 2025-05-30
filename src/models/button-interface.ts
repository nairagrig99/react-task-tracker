export interface ButtonInterface {
    label?: string,
    classes?:string,
    type?: 'button' | 'submit' | 'reset',
    handleEvent?: () => void
}