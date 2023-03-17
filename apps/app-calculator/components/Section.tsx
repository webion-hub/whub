
import WSection from "@wui/layout/Section";
import { SectionProps } from "@wui/layout/Section/Section";

export const Section = (props: SectionProps) => 
  <WSection
    {...props}
    sx={{
      paddingBottom: 0,
      ...props.sx
    }}
  >
    {props.children}
  </WSection>