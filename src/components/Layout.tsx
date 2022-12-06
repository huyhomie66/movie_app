import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = (props) => {
  return <Box>{props.children}</Box>;
};

export { Layout };
