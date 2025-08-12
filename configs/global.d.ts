type onBoardingSlidesTypes = {
  color: string;
  image: any;
  secondTitle: string;
  subTitle: string;
};

type DropdownItem = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  data: DropdownItem[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

type loginData = {
  email: string;
  password: string;
};

type customButtonProps = {
  loading?: boolean;
};

type signUpData = {
  firstName: string;
  orgName: string;
  address: string;
  country: string;
  currency: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  jobTitle: string;
};

type TitleProps = {
  title: string;
  marginTop?: boolean;
};

type StatProps = {
  title: string;
  value: number;
  side: "left" | "right";
  type: "cash" | "count";
};

type TransactionProps = {
  image: string;
  name: string;
  date: string;
  quantityChange: string;
  amount: string;
  code: string;
};

type LowStockProps = {
  name: string;
  count: number;
};

type CategoryProps = {
  label: string;
  value: number;
};

type DropdownMenuProps = {
  title: string;
  options: string[];
  onSelect?: (value: string) => void;
};
