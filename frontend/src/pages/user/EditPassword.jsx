import ContentContainer from "../../components/ContentContainer"
import EditPasswordForm from "../../components/forms/EditPasswordForm"
import TitleContainer from "../../components/TitleContainer"

function EditPassword() {
  return (
    <section className="user-section">
      <TitleContainer>Change Password</TitleContainer>
      
      <ContentContainer className="gap-24">
        <EditPasswordForm />
      </ContentContainer>
    </section>
  )
}

export default EditPassword