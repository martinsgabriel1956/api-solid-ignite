## FRs (Functional requirements)

- [ ] It should be possible to create a new user
- [ ] It should be possible to authenticate an existing user
- [ ] It should be possible to get the perfil of an logged user
- [ ] It should be possible to get the number of check-ins of an logged user
- [ ] It should be possible for the logged-in user to get your own check-ins history
- [ ] It should be possible for the logged-in user to search for nearby gyms
- [ ] It should be possible for the logged-in user to search gyms by name
- [ ] It should be possible for the logged-in user to realize a check-in
- [ ] It should be possible to validate a check-in of an existing user
- [ ] It should be possible to register a new gym

## Business rules (BRs)

- [ ] The user should not be able to register yourself with the same email
- [ ] The user should not be able to do two check-ins in the same day
- [ ] The user should not be able to do check-ins if he/she is not closer to the gym (100m)
- [ ] The check-in only be able to be validated until 20 minutes after the check-in was created.
- [ ] The check-in only be able to be validated by admin
- [ ] The Gym only be able to be registered by admin

## Non-functional requirements (NFRs)

- [ ] The user password need to be encrypted
- [ ] The application data need to be persisted in a PostgreSQL database
- [ ] All data list need to be paginated with 20 items per page
- [ ] The user must be indicated by a JWT
