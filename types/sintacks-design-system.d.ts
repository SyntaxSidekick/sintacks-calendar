declare module 'sintacks-design-system' {
  import { ComponentPropsWithoutRef, ElementRef } from 'react'
  
  // Button component
  export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    asChild?: boolean
  }
  export const Button: React.ForwardRefExoticComponent<ButtonProps>

  // Input component
  export interface InputProps extends ComponentPropsWithoutRef<'input'> {}
  export const Input: React.ForwardRefExoticComponent<InputProps>

  // Label component
  export interface LabelProps extends ComponentPropsWithoutRef<'label'> {}
  export const Label: React.ForwardRefExoticComponent<LabelProps>

  // Textarea component
  export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {}
  export const Textarea: React.ForwardRefExoticComponent<TextareaProps>

  // Dialog components
  export interface DialogProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    children?: React.ReactNode
  }
  export const Dialog: React.FC<DialogProps>

  export interface DialogContentProps extends ComponentPropsWithoutRef<'div'> {}
  export const DialogContent: React.ForwardRefExoticComponent<DialogContentProps>

  export interface DialogHeaderProps extends ComponentPropsWithoutRef<'div'> {}
  export const DialogHeader: React.FC<DialogHeaderProps>

  export interface DialogFooterProps extends ComponentPropsWithoutRef<'div'> {}
  export const DialogFooter: React.FC<DialogFooterProps>

  export interface DialogTitleProps extends ComponentPropsWithoutRef<'h2'> {}
  export const DialogTitle: React.ForwardRefExoticComponent<DialogTitleProps>

  export interface DialogDescriptionProps extends ComponentPropsWithoutRef<'p'> {}
  export const DialogDescription: React.ForwardRefExoticComponent<DialogDescriptionProps>

  // Add other components as needed...
}
