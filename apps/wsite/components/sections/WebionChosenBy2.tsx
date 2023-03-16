import { NextImg } from "@wui/components";
import { ChosenBy, ISection } from "@wui/sections";

export default function WebionChosenBy2(props: ISection) {
  return (
    <ChosenBy 
      id={props.id} 
      invert
      blackAndWhite
    >
      <NextImg
        priority
        auto={{ height: '28px' }}
        sizes="25vw"
        alt="massyve"
        src="/assets/images/clients/massyve.png"
      />
      <NextImg
        priority
        auto={{ height: '28px' }}
        sizes="25vw"
        alt="The Pink Palace"
        src="/assets/images/clients/pink-palace.png"
      />
      <NextImg
        priority
        auto={{ height: '28px' }}
        sizes="25vw"
        alt="The Pink Palace"
        src="/assets/images/clients/elfo-avventure.png"
      />
      <NextImg
        priority
        auto={{ height: '28px' }}
        sizes="25vw"
        alt="Qubì"
        src="/assets/images/clients/qubì.png"
      />
      <NextImg
        priority
        auto={{ height: '36px' }}
        sizes="25vw"
        alt="Parva domus"
        src="/assets/images/clients/parva.png"
      />
    </ChosenBy>
  )
}