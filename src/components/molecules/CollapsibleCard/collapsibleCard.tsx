import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
}

export default function CollapsibleCard({
  title,
  children
}: CollapsibleCardProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem className="border-none" value={title}>
        <AccordionTrigger className="flex w-full items-center justify-between bg-intense-purple px-6 py-4 text-lg font-bold text-white transition-all hover:no-underline md:px-8 md:py-6 md:text-2xl [&[data-state=closed]]:rounded-[32px] [&[data-state=open]]:rounded-t-[32px]">
          {title}
        </AccordionTrigger>
        <AccordionContent className="rounded-b-[32px] border-x-2 border-b-2 border-intense-purple px-6 pb-6 pt-6 text-justify text-sm leading-relaxed text-black transition-all md:px-8 md:text-base">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
