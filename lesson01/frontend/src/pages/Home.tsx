import { Form } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Home() {
    return (
        <>
            <div>Hello world!</div>
            <Button>See pets</Button>
            <Form action="/">
                <input placeholder="animal name"/>
            </Form>
        </>
    );

}