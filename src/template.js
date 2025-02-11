const fs = require("fs-extra")
const path = require("path")
const constants = require("./constants")

/**
 * Individual parsed template.
 *
 * @param rootPath the absolute path to where templates are listed
 * @param name the name of this template
 */
module.exports = function (rootPath, name, type) {
  const template = this
  template.rootPath = rootPath
  template.type = type
  template.name = name
  template.path = path.join(rootPath, name)
  const definitionPath = path.join(template.path, "definition.json")
  template.definition = require(definitionPath)


  /**
   * Builds the structure used inside the manifest for this template.
   * This consists of the name, type, and template definition JSON.
   *
   * @returns {object} the manifest entry
   */
  template.getManifestEntry = () => {
    const { category, name, description, image, icon, background } = template.definition
    return {
      background,
      icon,
      category,
      description,
      name,
      type: template.type,
      key: `${template.type}/${template.name}`,
      image: `https://${constants.AWS_S3_BUCKET_NAME}.s3.${constants.AWS_REGION}.amazonaws.com/${image}`
    }
  }
}