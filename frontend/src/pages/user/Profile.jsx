import { useEffect, useState } from "react"
import ContentContainer from "../../components/ContentContainer"
import TitleContainer from "../../components/TitleContainer"
import { useAuthContext } from "../../hooks/useAuthContext"
import { getOneUser } from "../../api/UsersApi"
import LoaderIcon from "../../components/ui/LoaderIcon"
import { Edit } from "lucide-react"
import { Link } from "react-router-dom"

function Profile() {
  const { token } = useAuthContext()
  const [data, setData] = useState(null)

  useEffect(() => {
    getOneUser(token, setData)
  }, [token])

  return (
    <section className="user-section">
      <TitleContainer>
        Profile
      </TitleContainer>

      <ContentContainer className="gap-24">
        {
          (!data)
            ?
            <LoaderIcon className="grow h-[392px]" iconClassName="size-14" />
            :
            <div className="flex flex-col">

              <div className="flex flex-col gap-10 sm:flex-row">

                <div className="flex flex-col gap-5 items-center relative sm:static sm:basis-[30%]">

                  <div className="bg-slate-200 border border-slate-500 h-[150px] w-[150px] flex justify-center items-center rounded-lg sm:relative static">
                    TMP_IMG
                    <Edit className="size-5 absolute top-[2px] right-[2px] sm:block hidden" />
                  </div>

                  <Edit className="size-5 absolute top-[2px] right-[2px] block sm:hidden" />

                  <div className="sm:flex flex-col gap-2 max-w-[160px] hidden">
                    <Link to="/editprofile" className="bg-slate-200 px-4 py-2 rounded-lg  text-center">
                      Update Profile
                    </Link>
                    <Link to="/editpassword" className="bg-slate-200 px-4 py-2 rounded-lg  text-center">
                      Edit Password
                    </Link>
                  </div>
                </div>

                <hr className="bg-slate-200 h-[1px] my-[0px] w-[80%] mx-auto sm:hidden" />

                <div className="flex flex-col gap-4 sm:basis-[70%]">
                  <div className="flex flex-col items-center sm:items-start gap-4 relative">
                    {
                      Object.keys(data).map((name, i) => {
                        if (name != '_id') {
                          return (
                            <div key={i} className="flex flex-col items-center sm:items-start">
                              <span className="opacity-70 capitalize">
                                {name}
                              </span>

                              <span className="text-lg">
                                {data[name]}
                              </span>
                            </div>
                          )
                        }
                      })
                    }

                    <div className="flex flex-col items-center">
                      <span className="opacity-70 capitalize">
                        Password
                      </span>

                      <span className="text-lg">
                        ********
                      </span>
                    </div>

                    <Edit className="size-5 absolute top-[2px] right-[2px] sm:hidden" />
                  </div>
                </div>

              </div>

            </div>
        }
      </ContentContainer>
    </section>
  )
}

export default Profile