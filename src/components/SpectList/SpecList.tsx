import styles from "./SpecList.module.css";

interface Props {
    specs: Record<string, string>;
}

export function SpecList({ specs }: Props) {
    return (
        <div className={styles.specs}>
            <h3 className={styles.specsTitle}>ESPECIFICACIONES TÉCNICAS</h3>
            <table className={styles.specsTable}>
                <tbody>
                {Object.entries(specs).map(([key, value]) => (
                    <tr key={key}>
                        <th>{key}</th>
                        <td>{value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
