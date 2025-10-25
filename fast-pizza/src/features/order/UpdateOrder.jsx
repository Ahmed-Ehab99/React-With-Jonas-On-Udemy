import React from "react";
import { useFetcher } from "react-router";
import Button from "../../ui/Button";

const UpdateOrder = () => {
  // eslint-disable-next-line no-unused-vars
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;
