xterm -T "Webpack Builder" -e "cd bansaz/frontend/templates;npm run build;cd ../../..; $SHELL" &
xterm -T "Django Server" -e "source projenv/bin/activate;python bansaz/manage.py runserver; $SHELL"