
import { ModeToggle } from "./ui/mode-togol"

type SideHeaderProps = {
  children: string;
}

export function SiteHeader({children}: SideHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 pb-5 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex items-center gap-1 lg:gap-2 px-4 lg:px-6 w-full">
        <h1 className="font-medium text-base">{children}</h1>
        <div className="flex items-center gap-2 ml-auto">
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </header>
  )
}
