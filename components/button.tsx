import { cn } from "@/constants/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { Text, TextClassContext } from "./text";

const buttonVariants = cva(
  "group flex items-center justify-center rounded-[8] leading-none web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",

  {
    variants: {
      variant: {
        default: "bg-[#FF6347] web:hover:opacity-90 active:opacity-90",
        destructive: "bg-[#F2E8E8] web:hover:opacity-90 active:opacity-90",
        outline:
          "border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        secondary: "bg-secondary/50 web:hover:opacity-80 active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline",
        icon: "",
      },
      size: {
        default: "h-10 px-4 py-2 native:h-16 native:px-5 native:py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 native:h-14",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva(
  "web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors",
  {
    variants: {
      textVariant: {
        default: "text-white font-medium text-[15px]",
        destructive: "text-[#1C0D0D]",
        outline: "group-active:text-accent-foreground",
        secondary:
          "text-secondary-foreground group-active:text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: "text-primary group-active:underline",
        icon: "",
      },
      textSize: {
        default: "",
        sm: "native:text-sm",
        lg: "native:text-lg",
        icon: "",
      },
    },
    defaultVariants: {
      textVariant: "default",
      textSize: "default",
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> &
  customButtonProps;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    { className, variant, size, children, disabled, loading, ...props },
    ref
  ) => {
    const isDisabled = disabled || loading;
    return (
      <TextClassContext.Provider
        value={cn(
          isDisabled && "web:pointer-events-none",
          buttonTextVariants({ textVariant: variant, textSize: size })
        )}
      >
        <Pressable
          className={cn(
            isDisabled && "opacity-50 web:pointer-events-none",
            buttonVariants({ variant, size, className })
          )}
          ref={ref}
          role="button"
          disabled={isDisabled}
          {...props}
        >
          {loading ? (
            <ActivityIndicator
              size={"large"}
              className={cn(buttonTextVariants({ textVariant: variant }))}
            />
          ) : (
            <Text>{children as React.ReactNode}</Text>
          )}
        </Pressable>
      </TextClassContext.Provider>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
