export const useAuthenticatedRedirect = () => {
  const { isLoggedIn } = useSelector(selectSession);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const previousRoute = location?.state?.from;
      navigate(previousRoute || "/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
};
