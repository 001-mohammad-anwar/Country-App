import "./DetailsShimmer.css";
const DetailShimmer = () => {
  return (
    <div>
      <main className="ShimmerContainer">
        <div className="BackButton"></div>

        <div className="AllDetails">
            <div className="ShimmerImage"></div>
            <div className="information">
              <h4></h4>
              <div className="AllInformation">
                <div className="LeftShimmer">
                  <p>
                    <b></b> <span></span>
                  </p>
                  <p>
                    <b></b> <span></span>
                  </p>
                  <p>
                    <b></b> <span></span>
                  </p>
                  <p>
                    <b></b> <span></span>
                  </p>
                  <p>
                    <b></b> <span></span>
                  </p>
                </div>
                <div className="RightShimmer">
                  <div className="InnerRightShimmer">
                    <p>
                      <b></b> <span></span>
                    </p>
                    <p>
                      <b></b> <span></span>
                    </p>
                    <p>
                      <b></b> <span></span>
                    </p>
                  </div>
                  <div className="Border">
                    <b></b>

                    <p className="BorderCuntries"></p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default DetailShimmer;
