import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValue = {
    name: string,
    type?: string,
};

export default function UserForm(graphQL) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<FormValue>({
        defaultValues: {
            name: '',
            type: undefined,
        }
    });
    const onSubmit = async (data: FormValue) => {
        setIsSubmitting(true);
        try {
            
        }
    }
}