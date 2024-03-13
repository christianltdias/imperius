import { ReactNode, useState } from "react";
import styles from "./dropdown.common.module.sass";
import { concatStyles } from "../../../../utils/styles.utils";
import * as Unicons from '@iconscout/react-unicons';

type DropdownItem = {
  title: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  items?: DropdownItem[];
};

type DropdownProps = {
  children: ReactNode;
  color: 'primary' | 'secondary' | 'white';
  items?: DropdownItem[];
  isSelection?: boolean;
};

export default function Dropdown({ children, items = [], color = 'white', isSelection = false }: DropdownProps) {
  const [selected, setSelected] = useState<DropdownItem | undefined>(undefined);

  if(items.filter(i => i.items && i.items.length > 0).length > 1){
    throw new Error("Dropdown should not contain more than one item with sub items.")
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>, item: DropdownItem) => {
    setSelected(item);
    item.onClick?.apply(e)
  }

  const getDropdownItem = (item: DropdownItem): ReactNode => {
    if (item.items && item.items.length > 0) {
      return (
        <>
          <input
            className={styles["dropdown-sub"]}
            type="checkbox"
            id="dropdown-sub"
            name="dropdown-sub"
          />
          <label className={concatStyles(styles["for-dropdown-sub"], styles[color])} htmlFor="dropdown-sub">
            {item.title} <Unicons.UilPlus className={styles["uil"]} size="20" color="white" />
          </label>
          {item.items && item.items.length > 0 &&
            <div className={styles["section-dropdown-sub"]}>
              {item.items.map(s => getDropdownItem(s))}
            </div>
          }
        </>
      );
    }

    return (
      <a href="#" onClick={(e) => handleClick(e, item)} className={styles[color]}>
        {item.title}
        <Unicons.UilArrowRight className={styles["uil"]} size="20" color="white" />
      </a>
    );
  };

  return (
    <>
      <div className={styles["dropdown-wrapper"]}>
        <div className={styles["sec-center"]}>
          <input
            className={styles["dropdown"]}
            type="checkbox"
            id="dropdown"
            name="dropdown"
          />
          <label className={concatStyles(styles["for-dropdown"], styles["fixed"], styles[color])} htmlFor="dropdown">
            {isSelection && selected ? selected.title : children} <Unicons.UilArrowDown className={styles["uil"]} size="20" color={color !== 'white' ? 'white' : 'black' } />
          </label>
          {items.length > 0 && (
            <div className={styles["section-dropdown"]}>
              {items.map((i) => getDropdownItem(i))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}