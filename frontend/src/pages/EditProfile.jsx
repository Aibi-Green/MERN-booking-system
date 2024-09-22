import ContentContainer from "../components/ContentContainer"
import EditPasswordForm from "../components/forms/EditPasswordForm"
import EditProfileForm from "../components/forms/EditProfileForm"
import TitleContainer from "../components/TitleContainer"

function EditProfile() {
  return (
    <section className="user-section">
      <TitleContainer>Edit Profile</TitleContainer>
      
      <ContentContainer className="gap-24">
        <EditProfileForm />
        <EditPasswordForm />
      </ContentContainer>
    </section>
  )
}

export default EditProfile