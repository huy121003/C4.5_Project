// App.tsx
import React from "react";
import { Input, Button, Card, Form, notification } from "antd";
import { detectFakeNews } from "./detectFakeNews";

const App: React.FC = () => {
  const fullText =
    "This is a fake news checker application using the C4.5 algorithm. Please enter the news information to check.";

  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const { title, text } = values;

        // Use detectFakeNews function to check if the news is fake
        const isFakeNews = detectFakeNews(title, text);

        if (isFakeNews) {
          notification.error({
            message: "Fake News Alert",
            description: "The entered information is classified as fake news.",
          });
        } else {
          notification.success({
            message: "Real News",
            description: "The entered information is classified as real news.",
          });
        }
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10">
      <div className="flex-1 justify-start">
        <h1 className="text-4xl font-bold mb-6 text-gray-400">{fullText}</h1>
      </div>
      <div
        className="flex-1 transition-opacity duration-500 ease-in-out"
        style={{ transition: "opacity 0.5s ease-in-out" }}
      >
        <Card className="w-[1000px] p-6 bg-white rounded-lg shadow-lg flex-1">
          <Form form={form} layout="vertical" wrapperCol={{ span: 24 }}>
            <Form.Item
              name="title"
              label="Enter title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input placeholder="Enter title" size="large" />
            </Form.Item>
            <Form.Item
              name="text"
              label="Enter text"
              rules={[{ required: true, message: "Please enter the text" }]}
            >
              <Input.TextArea rows={10} placeholder="Enter text" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="w-full" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default App;
