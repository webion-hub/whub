import { NextImg } from "@wui/components";
import { ChosenBy, ISection } from "@wui/sections";

export function WebionChosenBy(props: ISection) {
  return (
    <ChosenBy id={props.id}>
      <NextImg
        priority
        auto
        height={28}
        sizes="25vw"
        alt="bocconi"
        src="/assets/images/clients/gianos.png"
      />
      <NextImg
        priority
        auto
        height={28}
        sizes="25vw"
        alt="simm"
        src="/assets/images/clients/simm.png"
      />
      <NextImg
        priority
        auto
        height={28}
        sizes="25vw"
        alt="bocconi"
        src="/assets/images/clients/bocconi.png"
      />
      <NextImg
        priority
        auto
        height={28}
        sizes="25vw"
        alt="kaire"
        src="/assets/images/clients/kaire.png"
      />
      <NextImg
        priority
        auto
        height={28}
        sizes="25vw"
        alt="LCI Agency"
        src="/assets/images/clients/lci-agency.png"
      />
      <NextImg
        priority
        auto
        height={28}
        sizes="25vw"
        alt="mentorz"
        src="/assets/images/clients/mentorz.png"
      />
      <NextImg
        priority
        auto
        height={28}
        sizes="25vw"
        alt="massyve"
        src="/assets/images/clients/massyve.png"
      />
      <NextImg
        priority
        auto
        height={28}
        sizes="25vw"
        alt="The Pink Palace"
        src="/assets/images/clients/pink-palace.png"
      />
      <NextImg
        priority
        auto
        height={28}
        sizes="25vw"
        alt="The Pink Palace"
        src="/assets/images/clients/elfo-avventure.png"
      />
    </ChosenBy>
  )
}