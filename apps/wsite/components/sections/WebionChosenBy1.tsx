import { NextImg } from "@wui/components";
import { ChosenBy, ISection } from "@wui/sections";

export default function WebionChosenBy1(props: ISection) {
  return (
    <ChosenBy 
      id={props.id}
      blackAndWhite
    >
      <NextImg
        loading="lazy"
        auto={{ height: '28px' }}
        sizes="25vw"
        alt="bocconi"
        src="/assets/images/clients/gianos.png"
      />
      <NextImg
        loading="lazy"
        auto={{ height: '28px' }}
        sizes="25vw"
        alt="simm"
        src="/assets/images/clients/simm.png"
      />
      <NextImg
        loading="lazy"
        auto={{ height: '28px' }}
        sizes="25vw"
        alt="bocconi"
        src="/assets/images/clients/bocconi.png"
      />
      <NextImg
        loading="lazy"
        auto={{ height: '28px' }}
        sizes="25vw"
        alt="kaire"
        src="/assets/images/clients/kaire.png"
      />
      <NextImg
        loading="lazy"
        auto={{ height: '28px' }}
        sizes="25vw"
        alt="LCI Agency"
        src="/assets/images/clients/lci-agency.png"
      />
      <NextImg
        loading="lazy"
        auto={{ height: '28px' }}
        sizes="25vw"
        alt="mentorz"
        src="/assets/images/clients/mentorz.png"
      />
    </ChosenBy>
  )
}