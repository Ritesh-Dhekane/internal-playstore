import colors from "./colors";

const globalStyles = {
  pageContainer: {
    minHeight: "100vh",
    background: colors.background,
    color: colors.text,
    padding: "clamp(20px, 5vw, 48px)",
    boxSizing: "border-box",
  },
  contentContainer: {
    maxWidth: 1120,
    margin: "0 auto",
  },
  pageHeader: {
    marginBottom: "clamp(20px, 4vw, 32px)",
  },
  sectionTitle: {
    fontSize: "clamp(28px, 6vw, 42px)",
    lineHeight: 1.1,
    margin: 0,
  },
  subtitleText: {
    color: colors.muted,
    fontSize: "clamp(15px, 3vw, 17px)",
    lineHeight: 1.5,
    margin: "10px 0 0",
  },
  responsiveGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
    gap: "clamp(16px, 3vw, 24px)",
    alignItems: "stretch",
  },
  card: {
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 14,
    padding: "clamp(18px, 4vw, 24px)",
    boxShadow: "0 8px 24px rgba(32,33,36,0.08)",
    color: colors.text,
    boxSizing: "border-box",
    height: "100%",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1,
    padding: "6px 10px",
  },
  button: {
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 700,
    minHeight: 44,
    padding: "10px 16px",
  },
  buttonGroup: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 20,
  },
  responsiveButton: {
    flex: "1 1 150px",
  },
  metadataText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 1.4,
  },
  emptyText: {
    color: colors.muted,
    margin: 0,
  },
  qrContainer: {
    marginTop: 22,
    textAlign: "center",
    overflow: "hidden",
  },
};

export default globalStyles;
