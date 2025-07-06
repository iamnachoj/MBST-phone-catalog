import styles from "../../PhoneDetails.module.css";

interface Props {
  specs: Record<string, string>;
}

export function SpecList({ specs }: Props) {
  return (
    <div className={styles.specs}>
      <h3>Especificaciones técnicas</h3>
      <ul>
        {Object.entries(specs).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
