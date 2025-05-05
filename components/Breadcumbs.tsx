import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import { HoverTextBreadcumbs } from "@/components/Animation";

export type BreadcrumbItem = {
  label: string;
  href: string;
  isCurrent?: boolean;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

const Breadcumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRightIcon
                  className="mx-1 h-4 w-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              )}

              {isLast || item.isCurrent ? (
                <span className="font-medium text-gray-400" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <HoverTextBreadcumbs>
                  <Link href={item.href}>{item.label}</Link>
                </HoverTextBreadcumbs>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcumbs;
