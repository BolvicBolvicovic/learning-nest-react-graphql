import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Button } from "../components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { usePets } from "@/hooks/usePets";


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

function PetsForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "",
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("Form submitted", data);
    }

    return (
    <Form {...form}>
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
    </Form>
  );
}

export default function Home() {
    const pets = usePets();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div>Hello world!</div>
            <Button onClick={() => console.log(pets.data)}>Get all pets</Button>
            <PetsForm />
        </div>
    );

}