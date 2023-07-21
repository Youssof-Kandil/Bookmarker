var siteName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("bookmarkURL");
if (localStorage.getItem("Site") == null) {
  var siteContainer = [];
} else {
  var siteContainer = JSON.parse(localStorage.getItem("Site"));
  display();
}

function display() {
  var cartoona = "";
  for (var i = 0; i < siteContainer.length; i++) {
    cartoona += `
<tr>
            <td>${i + 1}</td>
            <td>${siteContainer[i].name}</td>              
            <td>
              <button onclick="visit(${i})" class="btn btn-primary" data-index="0">
                <i class="fa-solid fa-eye pe-2"></i>Visit
              </button>
            </td>
            <td>
              <button onclick="deletes(${i})" class="btn btn-danger pe-2" data-index="0">
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </button>
            </td>
        </tr>
`;
  }
  document.getElementById("tableContent").innerHTML = cartoona;
}
function addURL() {
  if (!validateDate()) {
    alert(
      "Site Name or Url is not valid, Please follow the rules below :\n\nSite name must contain at least 3 characters\n\nSite URL must be a valid one "
    );
    return;
  }
  var flag = false;
  var website = {
    name: siteName.value,
    siteURL: siteUrl.value,
  };
  if (siteContainer.length > 0) {
    for (var i = 0; i < siteContainer.length; i++) {
      if (website.name == siteContainer[i].name) {
        flag = true;
      }
    }
    if (flag) {
      alert("This name has already been used before!");
    } else {
      siteContainer.push(website);
      localStorage.setItem("Site", JSON.stringify(siteContainer));
      display();
    }
  } else {
    siteContainer.push(website);
    localStorage.setItem("Site", JSON.stringify(siteContainer));
    display();
  }
}
function visit(index) {
  var hrefrence = siteContainer[index].siteURL;
  window.open(hrefrence, "_blank");
}
function deletes(index) {
  siteContainer.splice(index, 1);
  localStorage.setItem("Site", JSON.stringify(siteContainer));
  display();
}
function validateDate() {
  var regexName = /[a-z]{3}/i;
  if (!regexName.test(siteName.value)) {
    return false;
  }
  var regexURL =
    /^(http|ftp|https)?(\:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^!=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])+$/gim;
  if (!regexURL.test(siteUrl.value)) {
    return false;
  }
  return true;
}
