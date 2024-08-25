import styles from "./Avater.module.css";

export function Avater() {
  return (
    <>
      {/* Avater.svelte */}
      <div className={styles.avater}>
        <div className={styles.avaterContainer}>
          <div className={styles.avaterContainerStart}>
            <picture>
                {/* 1x and 2x, webp and jpg */}
                <source srcSet="/assets/gather_fishes_400x400.webp 2x" type="image/webp"/>
                <source srcSet="/assets/gather_fishes_400x400.jpg 2x" type="image/jpg"/>
                <source srcSet="/assets/gather_fishes_200x200.webp" type="image/webp"/>
                <source srcSet="/assets/gather_fishes_200x200.jpg" type="image/png"/>
                <img
                    src="/assets/gather_fishes_200x200.jpg"
                    className={styles.avaterIcon}
                    alt="yammerjp avater icon"
                    width="200px"
                    height="200px"
                />
            </picture>
          </div>
          <div className={styles.avaterContainerEnd}>
            <div className={styles.avaterDescription}>
              <div className={styles.fullname}>Keisuke Nakayama</div>
              <div className={styles.nickname}>yammer</div>
              <div className={styles.description}>
                <span className={styles.descriptionMass}>Web Application Developper /</span>
                <span className={styles.descriptionMass}>SCUBA Diver</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.avaterSvgWrapper}>
        <svg name="bezier-curve-circle">
          <clipPath id="bezier-curve-circle" clipPathUnits="objectBoundingBox">
            <path d="M 0 0.5 C 0 0.166, 0.166 0, 0.5 0 S 1 0.166, 1 0.5 S 0.833 1, 0.5 1 S 0, 0.833, 0, 0.5 Z" />
          </clipPath>
        </svg>
      </div>
    </>
  );
}
