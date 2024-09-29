import ContentContainer from "../../components/ContentContainer"
import EditProfileForm from "../../components/forms/EditProfileForm"
import TitleContainer from "../../components/TitleContainer"

function EditProfile() {
  return (
    <section className="user-section">
      <TitleContainer>Update Profile</TitleContainer>
      
      <ContentContainer className="gap-24">
        <EditProfileForm />
      </ContentContainer>
    </section>
  )
}

export default EditProfile