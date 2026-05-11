import svgPaths from "./svg-yuoc71b3kp";
import imgImagePineLabs from "./3d67253c2d3b78d2f253d8bd04d44ff1ae38c6c8.png";

function ImagePineLabs() {
  return (
    <div
      className="h-[28px] relative shrink-0 w-[82.469px]"
      data-name="Image (Pine Labs)"
    >
      <img
        alt=""
        className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full"
        src={imgImagePineLabs}
      />
    </div>
  );
}

function Container2() {
  return (
    <div
      className="bg-[#d1d5dc] h-[24px] relative shrink-0 w-px"
      data-name="Container"
    />
  );
}

function Container4() {
  return (
    <div
      className="h-[14px] overflow-clip relative shrink-0 w-full"
      data-name="Container"
    >
      <p className="absolute font-['Lato:Bold',sans-serif] leading-[14px] left-0 not-italic text-[#005656] text-[9px] top-[0.5px] tracking-[0.72px] uppercase whitespace-nowrap">
        Corporate Onboarding
      </p>
    </div>
  );
}

function Container5() {
  return (
    <div
      className="h-[18px] overflow-clip relative shrink-0 w-full"
      data-name="Container"
    >
      <p className="absolute font-['Lato:SemiBold',sans-serif] leading-[18px] left-0 not-italic text-[#101828] text-[12px] top-[-0.5px] whitespace-nowrap">
        Gift Card Procurement
      </p>
    </div>
  );
}

function Container3() {
  return (
    <div
      className="flex-[834.016_0_0] h-[32px] min-w-px relative"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div
      className="h-[32px] relative shrink-0 w-[965.484px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center relative size-full">
        <ImagePineLabs />
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="bg-white h-[42px] relative rounded-[10px] shrink-0 w-[126.516px]"
      data-name="Button"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[10px]"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Lato:SemiBold',sans-serif] leading-[20px] left-[63.5px] not-italic text-[#252b37] text-[14px] text-center top-[11.5px] whitespace-nowrap">{`Save & Log out`}</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div
      className="h-[42px] relative shrink-0 w-[1332px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[120px] relative size-full">
        <Container1 />
        <Button />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div
      className="bg-[rgba(255,255,255,0.95)] content-stretch flex h-[70px] items-center justify-center pb-px relative shrink-0 w-full"
      data-name="Header"
    >
      <div
        aria-hidden="true"
        className="absolute border-[rgba(229,231,235,0.6)] border-b border-solid inset-0 pointer-events-none"
      />
      <Container />
    </div>
  );
}

function Container7() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full whitespace-nowrap"
      data-name="Container"
    >
      <p className="font-['Lato:Bold',sans-serif] leading-[normal] relative shrink-0 text-[#101828] text-[20px]">
        Account Setup
      </p>
      <p className="font-['Lato:Regular',sans-serif] leading-[18px] relative shrink-0 text-[#4a5565] text-[12px]">
        2 of 4 step
      </p>
    </div>
  );
}

function Container10() {
  return (
    <div
      className="bg-[#005656] relative rounded-[8px] shrink-0 size-[28px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <div className="relative shrink-0 size-[24px]" data-name="Check">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
            <div
              className="absolute inset-[34.28%_26.38%_34.28%_26.4%]"
              data-name="Vector"
            >
              <div className="absolute inset-[-13.25%_-8.82%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 13.3333 9.54667"
                >
                  <path
                    d={svgPaths.p9889780}
                    id="Vector"
                    stroke="var(--stroke-0, white)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[70.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Lato:SemiBold',sans-serif] leading-[19.5px] left-0 not-italic text-[#364153] text-[16px] top-[-0.5px] whitespace-nowrap">
          Basic details
        </p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div
      className="content-stretch flex gap-[12px] h-[28px] items-center relative shrink-0 w-full"
      data-name="Container"
    >
      <Container10 />
      <Text />
    </div>
  );
}

function Container8() {
  return (
    <div
      className="bg-[#f3fcf6] relative rounded-[12px] shrink-0 w-full"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#77d4a3] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div
      className="bg-[rgba(255,255,255,0.2)] relative rounded-[8px] shrink-0 size-[28px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Lato:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">
          2
        </p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div
      className="h-[19.5px] relative shrink-0 w-[117.133px]"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Lato:SemiBold',sans-serif] leading-[19.5px] left-0 not-italic text-[16px] text-white top-[-0.5px] whitespace-nowrap">
          Organisation Details
        </p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div
      className="content-stretch flex gap-[12px] h-[28px] items-center relative shrink-0 w-full"
      data-name="Container"
    >
      <Container13 />
      <Text1 />
    </div>
  );
}

function Container11() {
  return (
    <div
      className="bg-gradient-to-r drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.06)] from-[#005656] relative rounded-[12px] shrink-0 to-[#007a7a] via-1/2 via-[#006565] w-full"
      data-name="Container"
    >
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div
      className="bg-[#005656] relative rounded-[16777200px] shrink-0 size-[6px]"
      data-name="Container"
    />
  );
}

function ListItem() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="List Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <Container14 />
          <p className="font-['Lato:SemiBold',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#005656] text-[12px] whitespace-nowrap">
            Business identity
          </p>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div
      className="bg-[#d0d5dd] relative rounded-[16777200px] shrink-0 size-[6px]"
      data-name="Container"
    />
  );
}

function ListItem1() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="List Item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[4px] relative size-full">
          <Container15 />
          <p className="font-['Lato:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#4a5565] text-[12px] whitespace-nowrap">
            Registered address
          </p>
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="relative shrink-0 w-full" data-name="List">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pl-[8px] relative size-full">
          <ListItem />
          <ListItem1 />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#e5e7eb] border-l border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[16px] relative size-full">
        <List />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full">
      <Container11 />
      <Frame10 />
    </div>
  );
}

function Container18() {
  return (
    <div
      className="bg-white relative rounded-[8px] shrink-0 size-[28px]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <p className="font-['Lato:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">
          3
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div
      className="content-stretch flex gap-[12px] h-[28px] items-center relative shrink-0 w-full"
      data-name="Container"
    >
      <Container18 />
      <p className="font-['Lato:SemiBold',sans-serif] leading-[19.5px] not-italic relative shrink-0 text-[#364153] text-[16px] whitespace-nowrap">
        Authorised signatory
      </p>
    </div>
  );
}

function Container16() {
  return (
    <div
      className="bg-[#f9fafb] relative rounded-[12px] shrink-0 w-full"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Container17 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div
      className="bg-white relative rounded-[8px] shrink-0 size-[28px]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <p className="font-['Lato:Bold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#99a1af] text-[12px] whitespace-nowrap">
          4
        </p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div
      className="h-[19.5px] relative shrink-0 w-[109.461px]"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Lato:SemiBold',sans-serif] leading-[19.5px] left-0 not-italic text-[#364153] text-[16px] top-[-0.5px] whitespace-nowrap">
          Review and Submit
        </p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div
      className="content-stretch flex gap-[12px] h-[28px] items-center relative shrink-0 w-full"
      data-name="Container"
    >
      <Container21 />
      <Text2 />
    </div>
  );
}

function Container19() {
  return (
    <div
      className="bg-[#f9fafb] relative rounded-[12px] shrink-0 w-full"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[12px]"
      />
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Container20 />
      </div>
    </div>
  );
}

function NumberedList() {
  return (
    <div
      className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
      data-name="Numbered List"
    >
      <Container8 />
      <Frame9 />
      <Container16 />
      <Container19 />
    </div>
  );
}

function Container6() {
  return (
    <div
      className="bg-[rgba(255,255,255,0.6)] content-stretch flex flex-col gap-[24px] items-start p-[24px] rounded-[24px] shrink-0 sticky top-0 w-[348px]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_10px_15px_0px_rgba(16,24,40,0.05),0px_4px_6px_0px_rgba(16,24,40,0.05)]"
      />
      <Container7 />
      <NumberedList />
    </div>
  );
}

function Container25() {
  return (
    <div
      className="bg-[rgba(255,255,255,0.15)] h-[23px] relative rounded-[16777200px] shrink-0 w-[171.648px]"
      data-name="Container"
    >
      <p className="absolute font-['Lato:Bold',sans-serif] leading-[15px] left-[12px] not-italic text-[10px] text-[rgba(255,255,255,0.9)] top-[4.5px] tracking-[1.1px] uppercase whitespace-nowrap">
        Usually takes 1 minute
      </p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start not-italic relative shrink-0 w-full">
      <p className="font-['PP_Telegraf:SemiBold',sans-serif] leading-[38px] relative shrink-0 text-[30px] text-white w-full">
        Organisation Details
      </p>
      <p className="font-['Lato:Regular',sans-serif] leading-[21px] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.8)] w-full">{`Verify your company's legal information`}</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-[292px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[9px] items-start relative size-full">
        <Container25 />
        <Frame11 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div
      className="content-stretch flex flex-col gap-[2px] h-[49px] items-end not-italic relative shrink-0 text-right whitespace-nowrap"
      data-name="Container"
    >
      <p className="font-['PP_Telegraf:Bold',sans-serif] leading-[32px] relative shrink-0 text-[#d0f255] text-[24px]">
        40%
      </p>
      <p className="font-['Lato:SemiBold',sans-serif] leading-[15px] relative shrink-0 text-[12px] text-[rgba(255,255,255,0.6)] uppercase">
        Complete
      </p>
    </div>
  );
}

function Container30() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[8px] left-[100.12px] to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(255,255,255,0.6)] w-[51px]"
      data-name="Container"
    />
  );
}

function Container29() {
  return (
    <div
      className="bg-gradient-to-r from-[#d0f255] h-[8px] overflow-clip relative rounded-[16777200px] shrink-0 to-[#b8e024] w-[51px]"
      data-name="Container"
    >
      <Container30 />
    </div>
  );
}

function Container32() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[8px] left-[100.12px] to-[rgba(0,0,0,0)] top-0 via-1/2 via-[rgba(255,255,255,0.6)] w-[51px]"
      data-name="Container"
    />
  );
}

function Container31() {
  return (
    <div
      className="absolute bg-[#d0f255] left-[41px] rounded-[16777200px] size-[16px] top-[-4px]"
      data-name="Container"
    >
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container32 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#fdfff7] border-solid inset-0 pointer-events-none rounded-[16777200px] shadow-[0px_0px_12px_0px_rgba(208,242,85,0.5)]"
      />
    </div>
  );
}

function Container28() {
  return (
    <div
      className="bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col h-[8px] items-start relative rounded-[16777200px] shrink-0 w-full"
      data-name="Container"
    >
      <Container29 />
      <Container31 />
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-[128px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-end relative size-full">
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div
      className="content-stretch flex items-start justify-between relative shrink-0 w-full"
      data-name="Container"
    >
      <Container24 />
      <Container26 />
    </div>
  );
}

function Container22() {
  return (
    <div
      className="bg-gradient-to-r from-[#005656] relative rounded-tl-[20px] rounded-tr-[20px] shrink-0 to-[#007a7a] via-1/2 via-[#006565] w-full"
      data-name="Container"
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[24px] relative size-full">
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div
      className="bg-white relative rounded-[9999px] shrink-0 size-[20px]"
      data-name="Button"
    />
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0">
      <p className="font-['Lato:SemiBold',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#364153] text-[12px] whitespace-nowrap">
        Is GST Present?
      </p>
      <div
        className="content-stretch flex items-start relative shrink-0"
        data-name="Toggle"
      >
        <div
          className="bg-[#005656] content-stretch flex h-[24px] items-center justify-end p-[2px] relative rounded-[9999px] shrink-0 w-[44px]"
          data-name="_Toggle base"
        >
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-end justify-center min-w-px relative">
      <Frame6 />
      <p className="font-['Lato:Regular',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#4a5565] text-[12px] text-right w-[min-content]">
        If selected yes, the GSTIN state must match your billing/registered
        address.
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[24px] items-start pb-[12px] pt-[24px] px-[24px] relative size-full">
        <p className="flex-[1_0_0] font-['Lato:Bold',sans-serif] leading-[21px] min-w-px not-italic relative text-[#101828] text-[20px]">
          Business identity
        </p>
        <Frame7 />
      </div>
    </div>
  );
}

function LabelWrapper() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative shrink-0"
      data-name="Label wrapper"
    >
      <p className="font-['Lato:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        GSTIN Number
      </p>
    </div>
  );
}

function Content() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] items-center min-w-px relative"
      data-name="Content"
    >
      <p className="flex-[1_0_0] font-['Lato:Regular',sans-serif] leading-[24px] min-w-px not-italic overflow-hidden relative text-[#181d27] text-[16px] text-ellipsis tracking-[-0.16px] whitespace-nowrap">
        27AAAAA0000A1Z5
      </p>
    </div>
  );
}

function Text3() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[44px] left-0 to-[rgba(255,255,255,0)] top-0 via-[rgba(208,242,85,0.08)] w-[603px]"
      data-name="Text"
    />
  );
}

function Input() {
  return (
    <div
      className="bg-[#fafafa] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content />
          <div
            className="overflow-clip relative shrink-0 size-[20px]"
            data-name="Check Circle"
          >
            <div className="absolute inset-[8.33%]" data-name="Vector">
              <svg
                className="absolute block inset-0 size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16.6667 16.6667"
              >
                <path
                  clipRule="evenodd"
                  d={svgPaths.p82ea180}
                  fill="var(--fill-0, #079455)"
                  fillRule="evenodd"
                  id="Vector"
                />
              </svg>
            </div>
          </div>
          <Text3 />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Input with label"
    >
      <LabelWrapper />
      <Input />
    </div>
  );
}

function InputField() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative"
      data-name="Input field"
    >
      <InputWithLabel />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <InputField />
    </div>
  );
}

function LabelWrapper1() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative shrink-0"
      data-name="Label wrapper"
    >
      <p className="font-['Lato:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        GSTIN Name
      </p>
    </div>
  );
}

function Content1() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] items-center min-w-px relative"
      data-name="Content"
    >
      <p className="flex-[1_0_0] font-['Lato:Regular',sans-serif] leading-[24px] min-w-px not-italic overflow-hidden relative text-[#414651] text-[16px] text-ellipsis tracking-[-0.16px] whitespace-nowrap">
        PINE LABS LIMITED
      </p>
    </div>
  );
}

function Text4() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[42px] left-0 to-[rgba(255,255,255,0)] top-px via-[rgba(208,242,85,0.08)] w-[290px]"
      data-name="Text"
    />
  );
}

function Input1() {
  return (
    <div
      className="bg-[#fafafa] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content1 />
          <Text4 />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Input with label"
    >
      <LabelWrapper1 />
      <Input1 />
    </div>
  );
}

function InputField1() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative"
      data-name="Input field"
    >
      <InputWithLabel1 />
    </div>
  );
}

function LabelWrapper2() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative shrink-0"
      data-name="Label wrapper"
    >
      <p className="font-['Lato:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        GSTIN State
      </p>
    </div>
  );
}

function Content2() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] items-center min-w-px relative"
      data-name="Content"
    >
      <p className="flex-[1_0_0] font-['Lato:Regular',sans-serif] leading-[24px] min-w-px not-italic overflow-hidden relative text-[#414651] text-[16px] text-ellipsis tracking-[-0.16px] whitespace-nowrap">
        KARNATAKA
      </p>
    </div>
  );
}

function Text5() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[42px] left-[0.5px] to-[rgba(255,255,255,0)] top-px via-[rgba(208,242,85,0.08)] w-[289px]"
      data-name="Text"
    />
  );
}

function Input2() {
  return (
    <div
      className="bg-[#fafafa] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content2 />
          <Text5 />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  );
}

function InputWithLabel2() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Input with label"
    >
      <LabelWrapper2 />
      <Input2 />
    </div>
  );
}

function InputField2() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative"
      data-name="Input field"
    >
      <InputWithLabel2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <InputField1 />
      <InputField2 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] py-[12px] relative size-full">
        <p className="font-['Lato:Semibold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#181d27] text-[18px] tracking-[-0.18px] whitespace-nowrap">
          GST details
        </p>
        <Frame4 />
        <Frame3 />
      </div>
    </div>
  );
}

function LabelWrapper3() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center leading-[20px] not-italic relative shrink-0 text-[14px] tracking-[-0.14px] whitespace-nowrap"
      data-name="Label wrapper"
    >
      <p className="font-['Lato:Semibold',sans-serif] relative shrink-0 text-[#414651]">
        PAN Number
      </p>
      <p className="font-['Lato:Medium',sans-serif] relative shrink-0 text-[#d92d20]">
        *
      </p>
    </div>
  );
}

function Content3() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] items-center min-w-px relative"
      data-name="Content"
    >
      <p className="flex-[1_0_0] font-['Lato:Regular',sans-serif] leading-[24px] min-w-px not-italic overflow-hidden relative text-[#a4a7ae] text-[16px] text-ellipsis tracking-[-0.16px] whitespace-nowrap">
        Enter PAN number
      </p>
    </div>
  );
}

function Text6() {
  return (
    <div
      className="-translate-y-1/2 absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[43px] left-0 to-[rgba(255,255,255,0)] top-[calc(50%-0.5px)] via-[rgba(208,242,85,0.08)] w-[603px]"
      data-name="Text"
    />
  );
}

function Input3() {
  return (
    <div
      className="bg-white relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content3 />
          <p className="font-['Lato:Medium',sans-serif] leading-[24px] not-italic overflow-hidden relative shrink-0 text-[#005656] text-[16px] text-ellipsis tracking-[-0.16px] whitespace-nowrap">
            Verify
          </p>
          <Text6 />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  );
}

function InputWithLabel3() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Input with label"
    >
      <LabelWrapper3 />
      <Input3 />
    </div>
  );
}

function SupportingText() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0 w-full"
      data-name="Supporting text"
    >
      <p className="font-['Lato:Regular',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#717680] text-[14px] tracking-[-0.14px] w-[min-content]">
        PAN details will be matched against the type of entity/organisation.
      </p>
    </div>
  );
}

function InputField3() {
  return (
    <div
      className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full"
      data-name="Input field"
    >
      <InputWithLabel3 />
      <SupportingText />
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] py-[12px] relative size-full">
        <p className="font-['Lato:Semibold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#181d27] text-[18px] tracking-[-0.18px] whitespace-nowrap">
          PAN details
        </p>
        <InputField3 />
      </div>
    </div>
  );
}

function LabelWrapper4() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative shrink-0"
      data-name="Label wrapper"
    >
      <p className="font-['Lato:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        CIN/LLP No
      </p>
    </div>
  );
}

function Content4() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] items-center min-w-px relative"
      data-name="Content"
    >
      <p className="flex-[1_0_0] font-['Lato:Regular',sans-serif] leading-[24px] min-w-px not-italic overflow-hidden relative text-[#181d27] text-[16px] text-ellipsis tracking-[-0.16px] whitespace-nowrap">
        U31900DL1991PLC043974
      </p>
    </div>
  );
}

function Text7() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[42px] left-0 to-[rgba(255,255,255,0)] top-px via-[rgba(208,242,85,0.08)] w-[290px]"
      data-name="Text"
    />
  );
}

function Input4() {
  return (
    <div
      className="bg-[#fafafa] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content4 />
          <div
            className="overflow-clip relative shrink-0 size-[20px]"
            data-name="Check Circle"
          >
            <div className="absolute inset-[8.33%]" data-name="Vector">
              <svg
                className="absolute block inset-0 size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16.6667 16.6667"
              >
                <path
                  clipRule="evenodd"
                  d={svgPaths.p82ea180}
                  fill="var(--fill-0, #079455)"
                  fillRule="evenodd"
                  id="Vector"
                />
              </svg>
            </div>
          </div>
          <Text7 />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  );
}

function InputWithLabel4() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Input with label"
    >
      <LabelWrapper4 />
      <Input4 />
    </div>
  );
}

function InputField4() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative"
      data-name="Input field"
    >
      <InputWithLabel4 />
    </div>
  );
}

function LabelWrapper5() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative shrink-0"
      data-name="Label wrapper"
    >
      <p className="font-['Lato:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        CIN/LLP Name
      </p>
    </div>
  );
}

function Content5() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] items-center min-w-px relative"
      data-name="Content"
    >
      <p className="flex-[1_0_0] font-['Lato:Regular',sans-serif] leading-[24px] min-w-px not-italic overflow-hidden relative text-[#414651] text-[16px] text-ellipsis tracking-[-0.16px] whitespace-nowrap">
        PINE LABS LIMITED
      </p>
    </div>
  );
}

function Text8() {
  return (
    <div
      className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[42px] left-[0.5px] to-[rgba(255,255,255,0)] top-px via-[rgba(208,242,85,0.08)] w-[290px]"
      data-name="Text"
    />
  );
}

function Input5() {
  return (
    <div
      className="bg-[#fafafa] relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content5 />
          <Text8 />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  );
}

function InputWithLabel5() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Input with label"
    >
      <LabelWrapper5 />
      <Input5 />
    </div>
  );
}

function InputField5() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative"
      data-name="Input field"
    >
      <InputWithLabel5 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <InputField4 />
      <InputField5 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] py-[12px] relative size-full">
        <p className="font-['Lato:Semibold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#181d27] text-[18px] tracking-[-0.18px] whitespace-nowrap">
          CIN details
        </p>
        <Frame1 />
      </div>
    </div>
  );
}

function LabelWrapper6() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative shrink-0"
      data-name="Label wrapper"
    >
      <p className="font-['Lato:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        TAN No.
      </p>
    </div>
  );
}

function Content6() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] items-center min-w-px relative"
      data-name="Content"
    >
      <p className="flex-[1_0_0] font-['Lato:Regular',sans-serif] leading-[24px] min-w-px not-italic overflow-hidden relative text-[#a4a7ae] text-[16px] text-ellipsis tracking-[-0.16px] whitespace-nowrap">
        Enter TAN Number
      </p>
    </div>
  );
}

function Input6() {
  return (
    <div
      className="bg-white relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[10px] relative size-full">
          <Content6 />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  );
}

function InputWithLabel6() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Input with label"
    >
      <LabelWrapper6 />
      <Input6 />
    </div>
  );
}

function SupportingText1() {
  return (
    <div
      className="content-stretch flex flex-col gap-[4px] items-end relative shrink-0 w-full"
      data-name="Supporting text"
    >
      <p className="font-['Lato:Regular',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#717680] text-[14px] tracking-[-0.14px] w-[min-content]">
        Provide only if available
      </p>
    </div>
  );
}

function InputField6() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px relative"
      data-name="Input field"
    >
      <InputWithLabel6 />
      <SupportingText1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[288px]">
      <InputField6 />
    </div>
  );
}

function LabelWrapper7() {
  return (
    <div
      className="content-stretch flex gap-[4px] items-center relative shrink-0"
      data-name="Label wrapper"
    >
      <p className="font-['Lato:Semibold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#414651] text-[14px] tracking-[-0.14px] whitespace-nowrap">
        Expected Annual Gift Card Spend
      </p>
    </div>
  );
}

function Content7() {
  return (
    <div
      className="content-stretch flex flex-[1_0_0] items-center min-w-px relative"
      data-name="Content"
    >
      <p className="flex-[1_0_0] font-['Lato:Regular',sans-serif] leading-[24px] min-w-px not-italic overflow-hidden relative text-[#414651] text-[16px] text-ellipsis tracking-[-0.16px] whitespace-nowrap">
        50Lac-1cr
      </p>
    </div>
  );
}

function Input7() {
  return (
    <div
      className="bg-white relative rounded-[8px] shrink-0 w-full"
      data-name="Input"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative size-full">
          <Content7 />
          <div
            className="overflow-clip relative shrink-0 size-[20px]"
            data-name="Alt Arrow Down"
          >
            <div className="absolute inset-[37.5%_20.83%]" data-name="Vector">
              <div className="absolute inset-[-15%_-6.43%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 13.1667 6.50001"
                >
                  <path
                    d={svgPaths.p1b1acb00}
                    id="Vector"
                    stroke="var(--stroke-0, #717680)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputWithLabel7() {
  return (
    <div
      className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
      data-name="Input with label"
    >
      <LabelWrapper7 />
      <Input7 />
    </div>
  );
}

function InputDropdown() {
  return (
    <div
      className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full"
      data-name="Input dropdown"
    >
      <InputWithLabel7 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
      <InputDropdown />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame />
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[24px] py-[12px] relative size-full">
        <Frame5 />
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pb-[12px] relative rounded-bl-[20px] rounded-br-[20px] shrink-0 w-full">
      <div
        aria-hidden="true"
        className="absolute border border-[#d5d7da] border-solid inset-0 pointer-events-none rounded-bl-[20px] rounded-br-[20px]"
      />
      <Frame8 />
      <Frame14 />
      <Frame12 />
      <Frame15 />
      <Frame18 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-[651px]">
      <Container22 />
      <Frame13 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[93px] items-start overflow-clip py-[64px] relative shrink-0">
      <Container6 />
      <Frame16 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g clipPath="url(#clip0_99_18789)" id="Icon">
          <path
            d={svgPaths.pc012c00}
            id="Vector"
            stroke="var(--stroke-0, #005656)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
          <path
            d="M7 4.66667V7"
            id="Vector_2"
            stroke="var(--stroke-0, #005656)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
          <path
            d="M7 9.33333H7.00583"
            id="Vector_3"
            stroke="var(--stroke-0, #005656)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
        </g>
        <defs>
          <clipPath id="clip0_99_18789">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon />
        <p className="font-['Lato:Regular',sans-serif] leading-[16.5px] not-italic relative shrink-0 text-[#717680] text-[12px] tracking-[0.0645px] whitespace-nowrap">
          All information is encrypted and stored securely as per industry
          standards.
        </p>
      </div>
    </div>
  );
}

function TextPadding() {
  return (
    <div
      className="content-stretch flex items-center justify-center relative shrink-0"
      data-name="Text padding"
    >
      <p className="font-['Lato:Semibold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.16px] whitespace-nowrap">{`Save & continue`}</p>
    </div>
  );
}

function Container33() {
  return (
    <div
      className="bg-[rgba(255,255,255,0.98)] content-stretch flex items-center justify-between pb-[24px] pt-[25px] px-[120px] relative shrink-0 w-[1332px]"
      data-name="Container"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none shadow-[0px_-1px_3px_0px_rgba(10,13,18,0.05)]"
      />
      <Container34 />
      <div
        className="bg-[#005656] min-w-[120px] relative rounded-[12px] shrink-0 w-[186px]"
        data-name="Buttons/Button"
      >
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center justify-center min-w-[inherit] overflow-clip px-[24px] py-[12px] relative rounded-[inherit] size-full">
          <TextPadding />
          <div
            className="overflow-clip relative shrink-0 size-[20px]"
            data-name="Style=Linear"
          >
            <div
              className="absolute bottom-1/4 left-[16.67%] right-[16.67%] top-1/4"
              data-name="Vector"
            >
              <div className="absolute inset-[-7.5%_-5.63%]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 14.8333 11.5"
                >
                  <path
                    d={svgPaths.p1cce8500}
                    id="Vector"
                    stroke="var(--stroke-0, white)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CorporateGiftCardOnboardingFlow() {
  return (
    <div
      className="bg-white content-stretch flex flex-col items-center relative rounded-[12px] size-full"
      data-name="Corporate Gift Card Onboarding Flow"
    >
      <Header />
      <Frame17 />
      <Container33 />
    </div>
  );
}
