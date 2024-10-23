import { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.png';
import menuImgActive from '../../image/icon/menu-active.png';
import menuImg from '../../image/icon/menu.png';
import userMenuImgActive from '../../image/icon/user-menu-active.png';
import userMenuImg from '../../image/icon/user-menu.png';
import ImageButton from './ImageButton';

interface HeaderItem {
  name: string;
  href?: string;
  onClick?: () => void;
}

interface HeaderProps {
  fixed?: boolean;
}

function LargeHeader({
  headerLeft,
  headerRight,
  fixed,
}: {
  headerLeft: JSX.Element[];
  headerRight: JSX.Element[];
  fixed?: boolean;
}) {
  return (
    <header
      className={`w-full h-[55px] flex justify-between px-[10px] ${
        fixed ? 'fixed w-screen' : ''
      }`}
    >
      <ul className="flex list-none items-center m-0 p-0">
        <li>
          <a href={'/'}>
            <img className="w-[210px]" src={logo} alt="logo" />
          </a>
        </li>
        {headerLeft}
      </ul>
      <ul className="flex list-none items-center m-0 p-0">{headerRight}</ul>
    </header>
  );
}

function SmallHeader({
  headerLeft,
  headerRight,
  fixed,
}: {
  headerLeft: JSX.Element[];
  headerRight: JSX.Element[];
  fixed?: boolean;
}) {
  const [isMenuActive, setMenuActive] = useState(false);
  const [isUserActive, setUserActive] = useState(false);

  return (
    <div className={`${fixed ? 'fixed w-screen' : 'mb-[70px]'}`}>
      <header className="lg:hidden flex items-center">
        <ImageButton
          width={'23px'}
          src={isMenuActive ? menuImgActive : menuImg}
          onClick={() => {
            if (!isMenuActive) {
              setUserActive(false);
            }
            setMenuActive(!isMenuActive);
          }}
        />
        <a href={'/'}>
          <img className="w-[210px]" src={logo} alt="logo" />
        </a>
        <ImageButton
          width={'23px'}
          src={isUserActive ? userMenuImgActive : userMenuImg}
          onClick={() => {
            if (!isUserActive) {
              setMenuActive(false);
            }
            setUserActive(!isUserActive);
          }}
        />
      </header>
      <div className="w-full flex flex-col items-center transition-all duration-1000">
        <ul
          className={`${
            isMenuActive ? 'flex opacity-100 visible h-[30px]' : 'hidden'
          } justify-evenly items-center w-full p-0 transition-opacity`}
        >
          {headerLeft}
        </ul>
        <ul
          className={`${
            isUserActive ? 'flex opacity-100 visible h-[30px]' : 'hidden'
          } justify-evenly items-center w-full p-0 transition-opacity`}
        >
          {headerRight}
        </ul>
      </div>
    </div>
  );
}

export default function Header({ fixed }: HeaderProps) {
  const headerItemsLeft: HeaderItem[] = [{ name: '고객지원', href: 'support' }];

  const headerLeft = headerItemsLeft.map((headerItem) => (
    <li key={headerItem.name} className="ml-5 text-lg">
      <a href={'/' + headerItem.href}>{headerItem.name}</a>
    </li>
  ));

  const [headerItemsRight, setHeaderItemsRight] = useState<HeaderItem[]>([]);

  useEffect(() => {
    const isLoggedIn = !!sessionStorage.getItem('ACCESS_TOKEN');
    if (isLoggedIn) {
      setHeaderItemsRight([
        { name: '문의하기', href: 'question' },
        { name: '내정보', href: 'myInfo' },
        {
          name: '로그아웃',
          onClick: () => {
            if (window.confirm('로그아웃하시겠습니까?')) {
              sessionStorage.removeItem('ACCESS_TOKEN');
              localStorage.removeItem('REFRESH_TOKEN');
              window.location.href = '/';
            }
          },
        },
        { name: '장바구니', href: 'cart' },
        { name: '주문조회', href: 'inquiry' },
        { name: '구매하기', href: 'choose' },
      ]);
    } else {
      setHeaderItemsRight([
        { name: '로그인', href: 'login' },
        { name: '장바구니', href: 'cart' },
        { name: '구매하기', href: 'choose' },
      ]);
    }
  }, []);

  const headerRight = headerItemsRight.map((headerItem) => (
    <li key={headerItem.name} className="mx-3">
      <button onClick={headerItem.onClick}>
        {headerItem.href ? (
          <a href={'/' + headerItem.href}>{headerItem.name}</a>
        ) : (
          headerItem.name
        )}
      </button>
    </li>
  ));

  return (
    <>
      <LargeHeader
        headerLeft={headerLeft}
        headerRight={headerRight}
        fixed={fixed}
      />
      <SmallHeader
        headerLeft={headerLeft}
        headerRight={headerRight}
        fixed={fixed}
      />
    </>
  );
}
