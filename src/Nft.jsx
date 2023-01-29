import "./css/swap.css";
import "./css/nft.css";
import no_image from "./no_image.jpg";
function Swap(props) {
  const cryft_url =
  "https://bafybeifygtp7aorvxqyhjggy5phoxpnucwaywebjanmpt42qyc6kpqfh4m.ipfs.nftstorage.link/";

  return (
    <div className="col-md-9">
      <div className="header">
        <div className="bg-rounded">
          <img className="vector" src={require("./images/Vector.png")} alt="" />
          <img className="bell" src={require("./images/bell.png")} alt="" />
        </div>
        <div className="bg-block"></div>
        <div className="name-addr">
          <h6>{props.address.substring(0, 16)}</h6>
        </div>
        <div className="hrz-separator"></div>
      </div>
      <div className="hrz-separator"></div>
      <div className=".img-container">
        <div
          className="cards"
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center !important",

          }}
        >
          {props.nfts?.map((employee) => {
            try {
            
            

              let url = JSON.parse(employee.metadata);

              if (
                url.image.startsWith("https") ||
                url.image.startsWith("http")
              ) {
                var image = url.image;
              } else {
                const ipfs_url = url.image?.slice(6);
                var image = "https://gateway.ipfs.io/ipfs/" + ipfs_url;
               
              }
             
              var isMp4 = image.substr(image.length - 3) === "mp4";
            


              return (
                <>
                  {isMp4 ? (
                    <>
                      <div
                      className="card"
                      style={{
                      width: "400px",
                      height: "400px",
                      borderRadius: "10PX",
                      margin: "15px",
                      textAlign: "center",
                      border: "1px solid #000",
                        }}
                      >
                        <video
                          controls
                          disablepictureinpicture
                          controlsList="noplaybackrate noremoteplayback  nodownload nofullscreen "
                          width="100%"
                          height="100%"
                        >
                          <source src={image} type="video/mp4" />
                          Sorry, your browser doesn't support videos.
                        </video>
                        <br />

                        <h5 style={{ color: "#fff" }}>{employee.name}</h5>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                      className="card"
                      style={{
                      width: "400px",
                      height: "400px",
                      borderRadius: "10PX",
                      margin: "15px",
                      textAlign: "center",
                      border: "1px solid #000",
                        }}
                      >
                        {url.image === undefined ? (
                          <>
                            {" "}
                            <img
                              src={no_image}
                              alt=""
                              style={{ width: "55%", height: "55%",  borderRadius: "10PX", }}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={image}
                              alt=""
                              style={{ width: "55%", height: "55%" }}
                            />4
                          </>
                        )}

                        <br />
                        <h5 style={{ color: "#fff" }}>{employee.name}</h5>
                      </div>
                    </>
                  )}
                </>
              );
            } catch {}
          })}
        </div>
      </div>
    </div>
  );
}
export default Swap;
