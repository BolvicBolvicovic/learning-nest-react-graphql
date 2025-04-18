import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Button } from "../components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useNewPet } from "@/hooks/usePets";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }).max(50, {
        message: "Name must be less than 50 characters",
    }),
    type: z.string().max(50, {
        message: "Type must be less than 50 characters",
    }).optional(),
});

export function PetsForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "",
        },
    });

    const { mutate } = useNewPet();

    function onSubmit(data: z.infer<typeof formSchema>) {
      mutate(data, {
        onSuccess: (data) => {
          console.log("Pet created successfully", data);
          form.reset();
        },
        onError: (error) => {
          console.error("Error creating pet", error);
        },
      })
    }

    return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center w-full p-4 space-y-4 bg-white rounded-lg shadow-md">
        <div className="text-2xl font-bold">Create a new pet</div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet name</FormLabel>
                <FormControl>
                  <Input placeholder="Jabba" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet type</FormLabel>
                <FormControl>
                  <Input placeholder="Worm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>
  );
}