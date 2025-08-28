import styles from "./styles.module.css";

type DefaultButtonProps = {
  icon: React.ReactNode;
  color?: "green" | "red";
} & React.ComponentProps<"button">;

export function DefaultButton({ icon, color, ...props}: DefaultButtonProps) {
  return (
    <>
      <button {...props} className={`${styles.button} ${styles[color || "green"]}`}>
        {icon}
      </button>
    </>
  );
}
