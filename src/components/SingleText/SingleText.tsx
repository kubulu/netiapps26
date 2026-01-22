import styles from "./SingleText.module.scss";

interface RightItem {
  items: string;
}

interface SingleTextItem {
  left_content: string;
  right_content: RightItem[];
}

interface SingleTextProps {
  data?: SingleTextItem[];
}

export default function SingleText({ data }: SingleTextProps) {
  console.log(data);

  return (
    <section className={styles.section}>
      <div className="container">
        {Array.isArray(data) &&
          data.map((element, index) => (
            <div className="row g-5" key={index}>
              <div className="col-lg-6">
                <div className={styles.leftContent}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: element.left_content,
                    }}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className={styles.rightContent}>
                  <ul className={styles.itemList}>
                    {Array.isArray(element.right_content) &&
                      element.right_content.map((item, idx) => (
                        <li key={idx} className={styles.item}>
                          {item.items}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
