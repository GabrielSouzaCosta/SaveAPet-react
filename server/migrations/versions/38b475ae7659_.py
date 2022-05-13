"""empty message

Revision ID: 38b475ae7659
Revises: 
Create Date: 2022-05-13 08:43:37.871649

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '38b475ae7659'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('animal', sa.Column('owner', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'animal', 'user', ['owner'], ['id'])
    op.add_column('user', sa.Column('interested_at', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'user', 'animal', ['interested_at'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_column('user', 'interested_at')
    op.drop_constraint(None, 'animal', type_='foreignkey')
    op.drop_column('animal', 'owner')
    # ### end Alembic commands ###
