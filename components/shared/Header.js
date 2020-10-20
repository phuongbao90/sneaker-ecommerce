import { useState, useEffect } from "react";
import { useAuth } from "services/AuthContext";
import Navbar from "components/shared/NavBar";
import { ReactSVG } from "react-svg";
import { ShoppingCart, User, LogOut } from "react-feather";
import { withSize } from "react-sizeme";
import Router from "next/router";
import SearchToggle from "components/UI/nav/SearchToggle";
import { useCycle } from "framer-motion";

const Header = ({ size: { width } }) => {
  const { logout, user } = useAuth();
  const [isSideNavOpen, toggleSideNavOpen] = useCycle(false, true);
  const [isSearchOpen, toggleSearchOpen] = useCycle(false, true);
  const [cartNumber, setCartNumber] = useState(null);

  useEffect(() => {
    user && setCartNumber(user.cart.order.length);
  }, [user]);

  useEffect(() => {
    if (isSideNavOpen && isSearchOpen) {
      toggleSearchOpen(false);
    }
  }, [isSideNavOpen]);

  useEffect(() => {
    if (isSearchOpen && isSideNavOpen) {
      toggleSideNavOpen(false);
    }
  }, [isSearchOpen]);

  return (
    <>
      <header>
        <div className="grid grid-cols-3 gap-4 py-2 px-10 bg-gray-200">
          <Navbar
            width={width}
            isSideNavOpen={isSideNavOpen}
            toggleSideNavOpen={toggleSideNavOpen}
            delay={isSearchOpen && isSideNavOpen}
          />

          <ReactSVG
            src="/images/logos/1517505968.svg"
            afterInjection={(error, svg) => {
              if (error) return;
            }}
            beforeInjection={(svg) => {
              svg.classList.add("svg-class-name");
              svg.setAttribute(
                "style",
                "width: 60px; height: 54px; cursor: pointer"
              );
            }}
            evalScripts="always"
            fallback={() => <span>Error!</span>}
            loading={() => <span>Loading</span>}
            wrapper="span"
            renumerateIRIElements={false}
            className="logo-wrapper mx-auto"
            onClick={() => {
              isSearchOpen && toggleSearchOpen(false);
              isSideNavOpen && toggleSideNavOpen(false);
              Router.push("/");
            }}
          />

          <span className="flex flex-row items-center justify-end">
            <span className="mr-8 sm:mr-12 cursor-pointer">
              <SearchToggle
                isSearchOpen={isSearchOpen}
                toggleSearchOpen={toggleSearchOpen}
                delay={isSearchOpen && isSideNavOpen}
              />
            </span>
            {user ? (
              <>
                <User
                  className="hidden lg:block mr-12 cursor-pointer"
                  onClick={() => {
                    Router.push("/account");
                  }}
                />

                <LogOut
                  className="hidden lg:block mr-12 cursor-pointer"
                  onClick={() => {
                    logout();
                  }}
                />

                <span className="cursor-pointer">
                  <ShoppingCart
                    className="shopping-cart-icon"
                    onClick={() => {
                      isSearchOpen && toggleSearchOpen(false);
                      isSideNavOpen && toggleSideNavOpen(false);
                      Router.push("/my-cart");
                    }}
                  />

                  <span
                    className={`${
                      cartNumber > 0 ? "inline-block" : "hidden"
                    } shopping-cart-count`}
                  >
                    {user.cart.order.length}
                  </span>
                </span>
              </>
            ) : (
              <span className="cursor-pointer">
                <User
                  onClick={() => {
                    isSearchOpen && toggleSearchOpen(false);
                    isSideNavOpen && toggleSideNavOpen(false);
                    Router.push("/sign-in");
                  }}
                />
              </span>
            )}
          </span>
        </div>
        <style jsx>{`
          header {
            position: fixed;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            top: 0;
            z-index: 105;
          }

          .shopping-cart-count {
            position: absolute;
            top: 6px;
            right: 12px;
            width: 22px;
            height: 22px;
            padding: 5px;
            color: white;
            background: red;
            border-radius: 50%;
            font-size: 13px;
            text-align: center;
            font-weight: 600;
            line-height: 1;
          }
        `}</style>
      </header>
    </>
  );
};

export default withSize()(Header);
