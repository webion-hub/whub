import WebionCard from "@wui/components/WebionCard";
import { ChildrenProps } from "@wui/core";

export const Card = (props: ChildrenProps ) => 
  <WebionCard
    sx={{
      width: '100%',
      padding: 8
    }}
  >
    {props.children}
  </WebionCard>