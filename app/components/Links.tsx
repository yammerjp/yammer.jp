import styles from "./Links.module.css";
export function Links() {
    return (
        <>
      <div className={styles.links}>
        <a href="https://twitter.com/yammerjp">
          <picture>
            <source srcSet="/assets/twitter.webp" type="image/webp"/>
            <source srcSet="/assets/twitter.png" type="image/png"/>
            <img
              className={styles.linksIcon}
              src="/assets/twitter.png"
              alt="Twitter icon"
            />
          </picture>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>Twitter</span>
          </div>
        </a>

        <a href="https://github.com/yammerjp">
          <picture>
            <source srcSet="/assets/github.webp" type="image/webp"/>
            <source srcSet="/assets/github.png" type="image/png"/>
            <img
              className={styles.linksIcon}
              src="/assets/github.png"
              alt="GitHub icon"
            />
          </picture>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>GitHub</span>
          </div>
        </a>

        <a href="https://qiita.com/yammerjp">
          <picture>
            <source srcSet="/assets/qiita.webp" type="image/webp"/>
            <source srcSet="/assets/qiita.png" type="image/png"/>
            <img
              className={styles.linksIcon}
              src="/assets/qiita.png"
              alt="GitHub icon"
            />
          </picture>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>Qiita</span>
          </div>
        </a>

        <a href="https://basd4g.hatenablog.com">
          <picture>
            <source srcSet="/assets/hatenablog.webp" type="image/webp"/>
            <source srcSet="/assets/hatenablog.png" type="image/png"/>
            <img
              className={styles.linksIcon}
              src="/assets/hatenablog.png"
              alt="hatenablog icon"
            />
          </picture>  
          <div className={styles.titleWrapper}>
            <span className={styles.title}>はてなブログ</span>
          </div>
        </a>

        <a href="https://memo.yammer.jp">
          <picture>
            <source srcSet="/assets/memo-yammer-jp.webp" type="image/webp"/>
            <source srcSet="/assets/memo-yammer-jp.png" type="image/png"/>
            <img
              className={styles.linksIcon}
              src="/assets/memo-yammer-jp.png"
              alt="memo-yammer-jp icon"
            />
          </picture>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>memo<wbr />.<wbr />yammer<wbr />.<wbr />jp</span>
          </div>
        </a>
      </div>
        </>
    );
}
