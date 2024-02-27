if [[ ! -z "${OAUTH2_ENABLED}" ]]
then
    sed -i "s|OAUTH2_ENABLED\\:!1|OAUTH2_ENABLED:${OAUTH2_ENABLED}|g" /opt/top-frontend/js/app.*.js
fi

if [[ ! -z "${API_URL}" ]]
then
    sed -i "s|API_URL\\:\"http\\://127\\.0\\.0\\.1\\:8080\"|API_URL:'${API_URL}'|g" /opt/top-frontend/js/app.*.js
fi

if [[ ! -z "${OAUTH2_URL}" ]]
then
    sed -i "s|OAUTH2_URL\\:\"http\\://127\\.0\\.0\\.1\\:8081\"|OAUTH2_URL:'${OAUTH2_URL}'|g" /opt/top-frontend/js/app.*.js
fi

if [[ ! -z "${OAUTH2_REALM}" ]]
then
    sed -i "s|OAUTH2_REALM\\:\"top-realm\"|OAUTH2_REALM:'${OAUTH2_REALM}'|g" /opt/top-frontend/js/app.*.js
fi

if [[ ! -z "${OAUTH2_CLIENT_ID}" ]]
then
    sed -i "s|OAUTH2_CLIENT_ID\\:\"top-frontend\"|OAUTH2_CLIENT_ID:'${OAUTH2_CLIENT_ID}'|g" /opt/top-frontend/js/app.*.js
fi

if [[ ! -z "${GDPR_NOTICE}" ]]
then
    sed -i "s|GDPR_NOTICE\\:!1|GDPR_NOTICE:${GDPR_NOTICE}|g" /opt/top-frontend/js/app.*.js
fi

if [[ ! -z "${GDPR_POLICY_URL}" ]]
then
    sed -i "s|GDPR_POLICY_URL\\:void 0|GDPR_POLICY_URL:'${GDPR_POLICY_URL}'|g" /opt/top-frontend/js/app.*.js
fi

if [[ ! -z "${SYSTEM_NOTICE}" ]]
then
    sed -i "s|SYSTEM_NOTICE\\:void 0|SYSTEM_NOTICE:'${SYSTEM_NOTICE}'|g" /opt/top-frontend/js/app.*.js
fi

if [[ ! -z "${DOCUMENTS_ENABLED}" ]]
then
    sed -i "s|DOCUMENTS_ENABLED\\:!1|DOCUMENTS_ENABLED:${DOCUMENTS_ENABLED}|g" /opt/top-frontend/js/app.*.js
fi

if [[ ! -z "${TOP_PHENOTYPIC_QUERY_DOC_BASE_URL}" ]]
then
    sed -i "s|TOP_PHENOTYPIC_QUERY_DOC_BASE_URL\\:\"https\\://onto-med\\.github\\.io/top-phenotypic-query/care/smith/top/top_phenotypic_query/c2reasoner\"|TOP_PHENOTYPIC_QUERY_DOC_BASE_URL:'${TOP_PHENOTYPIC_QUERY_DOC_BASE_URL}'|g" /opt/top-frontend/js/app.*.js
fi
