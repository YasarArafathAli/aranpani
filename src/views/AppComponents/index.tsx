import { Button, Radio, Select } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import InputField from "../../shared/components/InputField";
import "./appComponents.scss";

const options = [
  { label: "Apple", value: "Apple" },
  { label: "Pear", value: "Pear" },
  { label: "Orange", value: "Orange" },
];

interface AppComponentsProps {}

const AppComponents: FC<AppComponentsProps> = (props) => {
  const {} = props;
  return (
    <div className="app-components">
      <h1 className="text-center text-decoration">App Components</h1>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <InputField type="text" name="input" placeholder="Enter some text" />
          <div className="mt-5">
            <Button type="primary" className="mr-4">
              Primary Button
            </Button>
            <Button>Default Button</Button>
          </div>
          <div className="mt-5">
            <Checkbox /> Checkbox
          </div>
          <div className="mt-5">
            <Radio.Group defaultValue={1}>
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
            </Radio.Group>
          </div>

          <div className="mt-5">
            <Radio.Group
              options={options}
              defaultValue={"Apple"}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
          <div className="mt-5">
              <Select options={options}/>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AppComponents;
