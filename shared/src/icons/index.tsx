import { SVGProps } from 'react';
import { cn } from '../utils';

// Create a type for IconProps
interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

// Define all icons as React components
export const AddIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArchiveIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M21 8V21H3V8M10 12H14M1 5H23L19 1H5L1 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BackIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CheckIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChevronRightIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CloseIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const EditIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13M18.4142 2.41421C19.1953 1.63316 20.4616 1.63316 21.2426 2.41421C22.0237 3.19526 22.0237 4.46159 21.2426 5.24264L12 14.4853L8 15.4853L9 11.4853L18.4142 2.41421Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// export const FilterIcon = ({ className, ...props }: IconProps) => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
//     <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

export const FilterIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn(className)} {...props}>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6ZM5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12ZM8 18C8 17.4477 8.44772 17 9 17H15C15.5523 17 16 17.4477 16 18C16 18.5523 15.5523 19 15 19H9C8.44772 19 8 18.5523 8 18Z" fill="currentColor"/>
  </svg>
);


export const HideTabIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HighlightIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M13 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V9M13 3L19 9M13 3V7C13 8.10457 13.8954 9 15 9H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HourglassIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M5 22H19M5 2H19M5 2V8L9 12L5 16V22M19 2V8L15 12L19 16V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const InfoIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M12 16V12M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LightbulbIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M12 2V3M12 21V20M3 12H4M20 12H21M5.6 5.6L6.3 6.3M17.7 17.7L18.4 18.4M5.6 18.4L6.3 17.7M17.7 6.3L18.4 5.6M9 16C9 16 9.75 18 12 18C14.25 18 15 16 15 16M12 9V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LinkIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.53091C19.5521 2.60388 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55925 13.47 3.47L11.75 5.18M14 11C13.5705 10.4259 13.0226 9.95087 12.3934 9.60705C11.7642 9.26323 11.0685 9.05888 10.3533 9.00766C9.63816 8.95644 8.92037 9.05966 8.24861 9.3102C7.57686 9.56073 6.96684 9.95296 6.46 10.46L3.46 13.46C2.54919 14.403 2.04517 15.666 2.05656 16.977C2.06796 18.288 2.59382 19.5421 3.52085 20.4691C4.44788 21.3961 5.70195 21.922 7.01293 21.9334C8.32391 21.9448 9.58693 21.4407 10.53 20.53L12.24 18.82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const OverflowIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PauseIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M10 4H6V20H10V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 4H14V20H18V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PlayIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ReorderIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


// export const SearchIcon = ({ className, ...props }: IconProps) => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
//     <path d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.5509 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9057 16.3198C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z"
//       fill="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

export const SearchIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.5509 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9057 16.3198C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="currentColor"/>
  </svg>
);

export const SettingIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3247 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3247 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2447 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2447 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0816 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96846 20.2573 9.78164 19.9849C9.59482 19.7125 9.33369 19.5015 9.03 19.38C8.72838 19.2566 8.39381 19.2266 8.06941 19.2944C7.745 19.3622 7.44571 19.5249 7.21 19.76L7.15 19.82C6.96425 20.0057 6.74372 20.1532 6.50091 20.2538C6.2581 20.3544 5.9978 20.4063 5.735 20.4063C5.4722 20.4063 5.2119 20.3544 4.96909 20.2538C4.72628 20.1532 4.50575 20.0057 4.32 19.82C4.13425 19.6343 3.98677 19.4137 3.88616 19.1709C3.78555 18.9281 3.73364 18.6678 3.73364 18.405C3.73364 18.1422 3.78555 17.8819 3.88616 17.6391C3.98677 17.3963 4.13425 17.1757 4.32 16.99L4.38 16.93C4.61571 16.6943 4.77837 16.395 4.84619 16.0706C4.914 15.7462 4.88401 15.4116 4.76 15.11C4.62871 14.8142 4.41834 14.562 4.15005 14.3843C3.88176 14.2066 3.56736 14.1116 3.245 14.11H3C2.46957 14.11 1.96086 13.8993 1.58579 13.5242C1.21071 13.1491 1 12.6404 1 12.11C1 11.5796 1.21071 11.0709 1.58579 10.6958C1.96086 10.3207 2.46957 10.11 3 10.11H3.09C3.42099 10.1023 3.74272 9.99846 4.01511 9.81164C4.2875 9.62482 4.49853 9.36369 4.62 9.06C4.74337 8.75838 4.77343 8.42381 4.70561 8.09941C4.63779 7.775 4.47514 7.47571 4.24 7.24L4.18 7.18C3.99425 6.99425 3.84677 6.77372 3.74616 6.53091C3.64555 6.2881 3.59364 6.0278 3.59364 5.765C3.59364 5.5022 3.64555 5.2419 3.74616 4.99909C3.84677 4.75628 3.99425 4.53575 4.18 4.35C4.36575 4.16425 4.58628 4.01677 4.82909 3.91616C5.0719 3.81555 5.3322 3.76364 5.595 3.76364C5.8578 3.76364 6.1181 3.81555 6.36091 3.91616C6.60372 4.01677 6.82425 4.16425 7.01 4.35L7.07 4.41C7.30571 4.64571 7.605 4.80837 7.92941 4.87619C8.25381 4.944 8.58838 4.91401 8.89 4.79C9.18577 4.65871 9.43802 4.44834 9.61568 4.18005C9.79335 3.91176 9.88839 3.59736 9.89 3.275V3.11C9.89 2.57957 10.1007 2.07086 10.4758 1.69579C10.8509 1.32071 11.3596 1.11 11.89 1.11C12.4204 1.11 12.9291 1.32071 13.3042 1.69579C13.6793 2.07086 13.89 2.57957 13.89 3.11V3.2C13.8977 3.53099 14.0015 3.85272 14.1884 4.12511C14.3752 4.3975 14.6363 4.60853 14.94 4.73C15.2416 4.85337 15.5762 4.88343 15.9006 4.81561C16.225 4.74779 16.5243 4.58514 16.76 4.35L16.82 4.29C17.0057 4.10425 17.2263 3.95677 17.4691 3.85616C17.7119 3.75555 17.9722 3.70364 18.235 3.70364C18.4978 3.70364 18.7581 3.75555 19.0009 3.85616C19.2437 3.95677 19.4643 4.10425 19.65 4.29C19.8357 4.47575 19.9832 4.69628 20.0838 4.93909C20.1845 5.1819 20.2364 5.4422 20.2364 5.705C20.2364 5.9678 20.1845 6.2281 20.0838 6.47091C19.9832 6.71372 19.8357 6.93425 19.65 7.12L19.59 7.18C19.3543 7.41571 19.1916 7.715 19.1238 8.03941C19.056 8.36381 19.086 8.69838 19.21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SortIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M3 6H21M6 12H18M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StopIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M6 6H18V18H6V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TimeIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TrashIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TripleStarsIcon = ({ className, ...props }: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('w-4 h-4', className)} {...props}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
); 