export const boxSx = {
  shadow: "base",
  position: "sticky",
  top: 0,
  zIndex: 999,
};

export const flexSx = {
  width: {
    base: "100%",
    md: "app",
  },
  py: 4,
  px: { base: 4, md: 0 },
  mx: "auto",
  justifyContent: { base: "end", md: "space-between" },
  alignItems: "center",
};

export const imgSx = {
  display: { base: "none", md: "block" },
  width: "256px",
};

export const stackSx = {
  display: { base: "none", md: "flex" },
};

export const mobileSx = {
  display: { base: "flex", md: "none" },
};

export const drawerSx = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};
