models_map = {
    "linksGroupName": "links_group_name",
    "linksGroupImage": "links_group_image",
    "shortDescription": "short_description",
    "textColor": "text_color",
    "commonColor": "common_color",
    "backgroundColor": "background_color",
    "backgroundImage": "background_image",
    "blendedColor": "blended_color",
}


def map_frontend_to_backend(frontend_data: dict) -> dict:
    """
    :param frontend_data:
    :return: simple map for my frontend json and backend model in postgres
    """
    backend_data = {}
    for frontend_field, value in frontend_data.items():
        backend_field = models_map.get(frontend_field, None)
        if backend_field:
            backend_data[backend_field] = value
        else:
            backend_data[frontend_field] = value
    return backend_data
