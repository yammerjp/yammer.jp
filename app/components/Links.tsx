import styles from "./Links.module.css";
export function Links() {
    return (
        <>
      <div className={styles.links}>
        <a href="https://twitter.com/yammerjp">
          <img
            className={styles.linksIcon}
            src="/assets/twitter.png"
            alt="Twitter icon"
          />
          <div className={styles.titleWrapper}>
            <span className={styles.title}>Twitter</span>
          </div>
        </a>

        <a href="https://github.com/yammerjp">
          <img
            className={styles.linksIcon}
            src="/assets/github.png"
            alt="GitHub icon"
          />
          <div className={styles.titleWrapper}>
            <span className={styles.title}>GitHub</span>
          </div>
        </a>

        <a href="https://qiita.com/yammerjp">
          <img
            className={styles.linksIcon}
            src="/assets/qiita.png"
            alt="GitHub icon"
          />
          <div className={styles.titleWrapper}>
            <span className={styles.title}>Qiita</span>
          </div>
        </a>

        <a href="https://basd4g.hatenablog.com">
          <img
            className={styles.linksIcon}
            src="/assets/hatenablog.png"
            alt="hatenablog icon"
          />
          <div className={styles.titleWrapper}>
            <span className={styles.title}>はてなブログ</span>
          </div>
        </a>

        <a href="https://memo.yammer.jp">
          <img
            className={styles.linksIcon}
            src="/assets/memo-yammer-jp.png"
            alt="memo-yammer-jp icon"
          />
          <div className={styles.titleWrapper}>
            <span className={styles.title}>memo<wbr />.<wbr />yammer<wbr />.<wbr />jp</span>
          </div>
        </a>
      </div>
        </>
    );
}
