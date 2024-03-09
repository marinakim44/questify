import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function AddNewCardForm() {
  return (
    <Card color="transparent" shadow={false}>
      <form className="mt-8 mb-2 w-full">
        <div className="mb-1 flex flex-col gap-6">
          <Input
            size="lg"
            placeholder="question"
            className="px-3 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Input
            size="lg"
            placeholder="question description"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Input
            size="lg"
            placeholder="answer"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Input
            size="lg"
            placeholder="assigned to"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Input
            size="lg"
            placeholder="company name"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Input
            size="lg"
            placeholder="select properties"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
      </form>
    </Card>
  );
}
